'use client';

import axios from 'axios';
import { useState } from 'react';
import { Work } from '@prisma/client';
import { useRouter } from 'next/navigation';

import { useEdgeStore } from '@/lib/edgestore';
import { useToast } from '@/components/ui/use-toast';
import AlertModal from '@/components/modals/alert-modal';

interface WorkDeleteProps {
  work: Work;
}

export default function WorkDelete({ work }: WorkDeleteProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  const onDelete = async () => {
    try {
      setLoading(true);

      await edgestore.publicImages.delete({
        url: work.image
      });

      await axios.delete(`/api/work/${work.id}`);

      router.push('/');
      router.refresh();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Work has been successfully deleted.'
      });
    } catch (error) {
      console.log(error);

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <button
        onClick={() => setOpen(true)}
        type='button'
        className='text-[#3d3d4e] text-sm'
      >
        Delete
      </button>
    </>
  );
}
