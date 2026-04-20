'use client';

import { Button } from '../ui/Button';
import { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { SITE_CONFIG } from '@/lib/constants';

export function TippingButton() {
  const [loading, setLoading] = useState(false);

  const handleTip = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask tidak terdeteksi. Silakan install MetaMask.');
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Kirim 0.001 ETH sebagai contoh
      const tx = await signer.sendTransaction({
        to: SITE_CONFIG.cryptoAddress,
        value: ethers.parseEther('0.001'),
      });
      
      await tx.wait();
      toast.success('Terima kasih atas dukungannya! 🎉');
    } catch (error) {
      console.error(error);
      toast.error('Transaksi gagal atau dibatalkan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleTip} disabled={loading} variant="outline">
      {loading ? 'Memproses...' : '💰 Kirim Tip (0.001 ETH)'}
    </Button>
  );
}
