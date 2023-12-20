'use client';

import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean | undefined;
  onClose: (() => void) | undefined;
  disclaimer?: boolean;
  children?: React.ReactNode;
}

export default function Modal({
  title,
  description,
  isOpen,
  onClose,
  disclaimer = false,
  children
}: ModalProps) {
  const onChange = (open: boolean) => {
    if (!open) {
      if (onClose !== undefined) onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle
            className={cn(
              disclaimer && 'text-xl md:text-2xl flex items-center gap-3'
            )}
          >
            <AlertTriangle className='w-8 h-8 text-red-500' />
            {title}
          </DialogTitle>
          <DialogDescription className={cn(disclaimer && 'pt-2 text-justify')}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <>{children}</>
      </DialogContent>
    </Dialog>
  );
}
