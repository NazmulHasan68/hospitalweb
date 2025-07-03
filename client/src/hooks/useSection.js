import { useState } from 'react';
import {
  useAddItemToSectionMutation,
  useDeleteSectionImageMutation,
} from '@/redux/ApiController/bannerApi';

export default function useSection(bannerId, sectionName) {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    file: null,
  });

  const [addItemToSection] = useAddItemToSectionMutation();
  const [deleteSectionImage] = useDeleteSectionImageMutation();

  // Update form state
  const onChangeField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Open dialog
  const openAddDialog = () => setOpenDialog(true);

  // Close dialog and reset form
  const closeAddDialog = () => {
    setOpenDialog(false);
    setFormData({ title: '', subtitle: '', file: null });
  };

  // Submit new banner item
  const onSubmit = async () => {
    if (!formData.file) {
      alert('Please select a file');
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('subtitle', formData.subtitle);
    form.append('file', formData.file);

    try {
      await addItemToSection({
        id: bannerId,
        sectionName,
        body: form,
      }).unwrap();

      closeAddDialog();
    } catch (error) {
      console.error('Add item failed', error);
      alert('Failed to add banner');
    }
  };

  // Delete item at index
  const onDelete = async (index) => {
    try {
      await deleteSectionImage({
        id: bannerId,
        sectionName,
        index,
      }).unwrap();
    } catch (error) {
      console.error('Delete failed', error);
      alert('Failed to delete banner');
    }
  };

  return {
    openDialog,
    openAddDialog,
    closeAddDialog,
    formData,
    onChangeField,
    onSubmit,
    onDelete,
  };
}
