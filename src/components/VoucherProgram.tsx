"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud } from 'lucide-react';

const mockVouchers = [
  { id: 'VCH001', amount: 5, status: 'approved', expiry: '2024-12-31' },
  { id: 'VCH002', amount: 10, status: 'pending', expiry: 'N/A' },
  { id: 'VCH003', amount: 5, status: 'approved', expiry: '2024-11-30' },
  { id: 'VCH004', amount: 5, status: 'rejected', expiry: 'N/A' },
];

const statusMap = {
  approved: 'Disetujui',
  pending: 'Menunggu',
  rejected: 'Ditolak'
}

export function VoucherProgram() {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'Tidak ada file yang dipilih',
        description: 'Silakan pilih foto untuk diunggah.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Unggah Berhasil!',
      description: 'Foto Anda telah dikirim untuk verifikasi.',
    });
    // Reset file input
    setFile(null);
    // You might want to clear the input value as well
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="space-y-12">
      <Card>
        <CardHeader>
          <CardTitle>Unggah Wadah Kosong Anda</CardTitle>
          <CardDescription>
            Kirimkan foto yang jelas dari kemasan produk yang kosong. Setiap kiriman yang disetujui memberi Anda voucher $5.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <Button type="submit" disabled={!file}>
              <UploadCloud className="mr-2 h-4 w-4" />
              Kirim untuk Verifikasi
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Voucher Anda</CardTitle>
          <CardDescription>
            Berikut adalah status pengajuan voucher Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Voucher</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Kedaluwarsa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell className="font-medium">{voucher.id}</TableCell>
                  <TableCell>${voucher.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        voucher.status === 'approved'
                          ? 'default'
                          : voucher.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="capitalize bg-opacity-80"
                    >
                      {statusMap[voucher.status as keyof typeof statusMap]}
                    </Badge>
                  </TableCell>
                  <TableCell>{voucher.expiry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
