'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { doc, updateDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import EmojiPickerModal from '@/components/modals/EmojiPickerModal';
import { QRCodeSVG } from 'qrcode.react';

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const [name, setName] = useState(profile?.displayName || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [friendIdInput, setFriendIdInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: name,
        bio: bio,
      });
      await refreshProfile();
      setMessage({ text: 'Profile updated', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Update failed', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !friendIdInput) return;
    if (friendIdInput === profile?.auraId) {
      setMessage({ text: "that's your own ID", type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const q = query(collection(db, 'users'), where('auraId', '==', friendIdInput));
      const snap = await getDocs(q);
      if (snap.empty) {
        setMessage({ text: 'no one found with that ID', type: 'error' });
        return;
      }

      const friendData = snap.docs[0].data();
      
      // Check if already friends
      const qFriend = query(
        collection(db, 'friendships'), 
        where('userId', '==', user.uid), 
        where('friendId', '==', friendData.uid)
      );
      const friendSnap = await getDocs(qFriend);
      if (!friendSnap.empty) {
        setMessage({ text: 'already in your circle', type: 'error' });
        return;
      }

      await addDoc(collection(db, 'friendships'), {
        userId: user.uid,
        friendId: friendData.uid,
        createdAt: serverTimestamp(),
      });

      setMessage({ text: `Added ${friendData.displayName}`, type: 'success' });
      setFriendIdInput('');
    } catch (err) {
      setMessage({ text: 'Failed to add friend', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Identity */}
      <section className="text-center">
        <button 
          onClick={() => setShowEmojiPicker(true)}
          className="text-8xl mb-4 hover:scale-110 transition-transform cursor-pointer"
        >
          {profile?.avatar}
        </button>
        <h2 className="serif text-4xl mb-1">{profile?.displayName}</h2>
        <p className="text-aura-label text-aura-rose-dim mb-4">{profile?.auraId}</p>
        <p className="serif italic text-lg text-aura-rose-dim max-w-xs mx-auto">
          {profile?.bio || 'no bio yet'}
        </p>
      </section>

      {/* Customize */}
      <section className="flex flex-col gap-6">
        <h3 className="text-aura-label text-aura-rose">Customize</h3>
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4 bg-aura-surface p-6 rounded-xl border border-aura-surface-deep">
          <div className="flex flex-col gap-2">
            <label className="text-aura-label text-aura-rose-dim text-[9px]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-aura-bg border border-aura-ink/10 rounded-lg p-3 text-aura-ink focus:border-aura-rose outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-aura-label text-aura-rose-dim text-[9px]">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              className="bg-aura-bg border border-aura-ink/10 rounded-lg p-3 text-aura-ink focus:border-aura-rose outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-aura-rose text-aura-bg py-3 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors disabled:opacity-50"
          >
            {loading ? '...' : 'Save Profile'}
          </button>
        </form>
      </section>

      {/* Your ID */}
      <section className="flex flex-col gap-6">
        <h3 className="text-aura-label text-aura-rose">Your ID</h3>
        <div className="bg-aura-surface p-8 rounded-xl border border-aura-surface-deep flex flex-col items-center gap-6">
          <div className="text-aura-label text-2xl tracking-[0.4em] text-aura-rose">
            {profile?.auraId}
          </div>
          <div className="bg-white p-4 rounded-xl border border-aura-surface-deep">
            <QRCodeSVG value={profile?.auraId || ''} size={160} fgColor="#1a1010" bgColor="#ffffff" />
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(profile?.auraId || '');
              setMessage({ text: 'ID copied — share it with friends', type: 'success' });
              setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            }}
            className="text-aura-label text-aura-rose-dim hover:text-aura-rose transition-colors"
          >
            Copy ID
          </button>
        </div>
      </section>

      {/* Add Friend */}
      <section className="flex flex-col gap-6">
        <h3 className="text-aura-label text-aura-rose">Add Friend</h3>
        <form onSubmit={handleAddFriend} className="flex flex-col gap-4 bg-aura-surface p-6 rounded-xl border border-aura-surface-deep">
          <div className="flex flex-col gap-2">
            <label className="text-aura-label text-aura-rose-dim text-[9px]">AURA ID</label>
            <input
              type="text"
              placeholder="AURA-XXXX"
              value={friendIdInput}
              onChange={(e) => setFriendIdInput(e.target.value.toUpperCase())}
              className="bg-aura-bg border border-aura-ink/10 rounded-lg p-3 text-aura-ink focus:border-aura-rose outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-aura-rose text-aura-bg py-3 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors disabled:opacity-50"
          >
            {loading ? '...' : 'Add to Circle'}
          </button>
        </form>
      </section>

      {/* Toast Message */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full border shadow-xl text-aura-label text-[11px] ${
              message.type === 'success' ? 'bg-aura-surface border-aura-rose text-aura-rose' : 'bg-red-50 border-red-200 text-red-600'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEmojiPicker && (
          <EmojiPickerModal onClose={() => setShowEmojiPicker(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
