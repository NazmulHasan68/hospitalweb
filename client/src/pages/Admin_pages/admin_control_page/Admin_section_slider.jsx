import React, { useState } from 'react';
import Slider from 'react-slick';
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateSectionItemMutation,
  useDeleteSectionItemMutation,
} from '@/redux/ApiController/bannerApi';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'sonner';

export default function AdminSectionSlider({ sectionPath, sectionTitle, items }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', subtitle: '', file: null });

  const [createItem, { isLoading: creating }] = useCreateSectionItemMutation();
  const [deleteItem, { isLoading: deleting }] = useDeleteSectionItemMutation();

  const onChange = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!formData.file) return alert('File is required');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('banner', formData.file);
    try {
      await createItem({ sectionPath, body: data }).unwrap();
      setFormData({ title: '', subtitle: '', file: null });
      setDialogOpen(false);
      toast.success("Successfully Created!")
    } catch (err) {
      toast.error('Failed to add item');
    }
  };

  const handleDelete = async (id) => {
      try {
        await deleteItem({ sectionPath, id }).unwrap();
        toast.success("Deleted banner !")
      } catch {
        toast.error('Failed to delete item');
      }
  };

  const sliderSettings = {
    dots: true,
    infinite: items.length > 3,
    slidesToShow: Math.min(3, items.length),
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(2, items.length) },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="border rounded-lg shadow-md p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{sectionTitle}</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" className="hover:bg-blue-700 bg-blue-500 text-slate-50 font-medium" onClick={() => setDialogOpen(true)}>
              + Add banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add to {sectionTitle}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label className="mb-1 block font-medium text-gray-700">Title</Label>
                <Input
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) => onChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-1 block font-medium text-gray-700">Subtitle / Link</Label>
                <Textarea
                  placeholder="Enter subtitle or link"
                  value={formData.subtitle}
                  onChange={(e) => onChange('subtitle', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label className="mb-1 block font-medium text-gray-700">File (Image or Video)</Label>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => onChange('file', e.target.files[0])}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={creating}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
              >
                {creating ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {items?.length > 0 ? (
        <Slider {...sliderSettings}>
          {items.map((item) => (
            <div key={item._id} className="px-3">
              <div className="relative rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                {item.banner?.includes('.mp4') || item.video ? (
                  <video controls className="w-full h-56 sm:h-64 object-cover bg-black">
                    <source src={`${import.meta.env.VITE_BASE_URL}/public/banner/${item.banner || item.video}`} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/public/banner/${item.banner}`}
                    alt="banner"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                )}

                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deleting}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-md transition"
                  title="Delete item"
                >
                  🗑
                </button>

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold truncate">{item.title}</h3>
                  <p className="text-gray-300 text-sm truncate">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-400 italic mt-6">No items found.</p>
      )}
    </section>
  );
}
