'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import isSlug from 'validator/es/lib/isSlug';
import type { Profile } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

interface ProfileFormProps {
  profile?: Profile;
  onClose: () => void;
}

const formSchema = z.object({
  username: z
    .string()
    .toLowerCase()
    .min(3, { message: 'Please enter 3 or more characters.' })
    .refine((string) => isSlug(string), {
      message:
        'Please enter valid username consisting only letters, numbers, underscores or hyphens.'
    }),
  bio: z.string().min(1, { message: 'Please enter bio.' }),
  githubUrl: z
    .string()
    .toLowerCase()
    .url({ message: 'Please enter a valid GitHub URL.' }),
  linkedinUrl: z
    .string()
    .toLowerCase()
    .url({ message: 'Please enter a valid LinkedIn URL.' })
});

export default function ProfileForm({ profile, onClose }: ProfileFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: (profile && profile.username) ?? '',
      bio: (profile && profile.bio) ?? '',
      githubUrl: (profile && profile.githubUrl) ?? '',
      linkedinUrl: (profile && profile.linkedinUrl) ?? ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/profile', values);

      if (response.data.success) {
        toast({
          variant: 'default',
          title: 'Success!',
          description: 'Profile has been successfully saved.'
        });

        if (profile) {
          onClose();
          router.push('/');
          router.refresh();
        } else {
          window.location.replace('/');
        }
      }
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.error === 'Username is not available.'
      ) {
        form.setError('username', {
          type: 'manual',
          message: error.response.data.error
        });
      } else {
        console.log(error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4 py-1'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder='Enter your bio'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='githubUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your GitHub URL' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='linkedinUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your LinkedIn URL' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
            <Button
              onClick={onClose}
              type='button'
              variant='secondary'
              className='rounded-full bg-[#f8f7f4] hover:bg-[#f5f3f0]'
            >
              Cancel
            </Button>
            <Button disabled={loading} type='submit' className='rounded-full'>
              {loading && (
                <>
                  <Loader2 className='animate-spin mr-2' size={18} />
                  Saving...
                </>
              )}
              {!loading && <>Continue</>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
