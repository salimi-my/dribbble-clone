'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { useEdgeStore } from '@/lib/edgestore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { SingleImageDropzone } from '@/components/single-image-dropzone';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const formSchema = z.object({
  image: z.string(),
  title: z.string().min(1, { message: 'Please enter title.' }),
  description: z.string().min(1, { message: 'Please enter description.' }),
  liveSiteUrl: z.string().min(1, { message: 'Please enter website URL.' }),
  githubUrl: z.string().min(1, { message: 'Please enter GitHub URL.' }),
  category: z.string().min(1, { message: 'Please select category.' })
});

export default function UploadForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      title: '',
      description: '',
      liveSiteUrl: '',
      githubUrl: '',
      category: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setImageError(false);

      let imageURL = '';
      if (file && file instanceof File) {
        const uploadRes = await edgestore.publicImages.upload({
          file
        });

        if (uploadRes.url) {
          imageURL = uploadRes.url;
        }
      } else {
        setImageError(true);
        return;
      }

      const newValues = { ...values, image: imageURL };

      const response = await axios.post('/api/project', newValues);

      if (response.data.success) {
        toast({
          variant: 'default',
          title: 'Success!',
          description: 'Data has been successfully saved.'
        });
        // router.push(response.data.project.id);
      }
    } catch (error) {
      console.log(error);

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center'
      >
        <div className='w-full flex justify-between md:mx-2'>
          <Button
            onClick={() => router.back()}
            variant='outline'
            className='rounded-full p-[19px] shadow-none text-[13px] font-semibold'
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            type='submit'
            className='rounded-full p-5 shadow-none text-[13px] font-semibold'
          >
            {loading && (
              <>
                <Loader2 className='animate-spin mr-2' size={18} />
                <p>Saving...</p>
              </>
            )}
            {!loading && <p>Continue</p>}
          </Button>
        </div>
        <div className='w-full flex justify-center'>
          <h2 className='text-2xl md:text-[32px] font-bold mt-6 md:mt-[28px] mb-8 md:mb-12 text-center'>
            What have you been working on?
          </h2>
        </div>

        <SingleImageDropzone
          className='w-full h-full max-w-5xl min-h-[321px] md:min-h-[524px]'
          value={file}
          onChange={(file) => setFile(file)}
        />

        {imageError && (
          <p className='text-center text-red-500'>Please select image.</p>
        )}

        <div className='w-full max-w-5xl grid my-8'>
          <div className='flex flex-col space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder='Enter description'
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
              name='liveSiteUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter website URL' {...field} />
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
                    <Input placeholder='Enter GitHub URL' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Animation'>Animation</SelectItem>
                      <SelectItem value='Branding'>Branding</SelectItem>
                      <SelectItem value='Illustration'>Illustration</SelectItem>
                      <SelectItem value='Mobile'>Mobile</SelectItem>
                      <SelectItem value='Print'>Print</SelectItem>
                      <SelectItem value='Product Design'>
                        Product Design
                      </SelectItem>
                      <SelectItem value='Typography'>Typography</SelectItem>
                      <SelectItem value='Web Design'>Web Design</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
