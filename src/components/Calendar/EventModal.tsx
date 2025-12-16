import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from '@/components/primitives/Modal';
import { Button } from '@/components/primitives/Button';
import { Select } from '@/components/primitives/Select';
import { cn } from '@/lib/utils';
import {
  EventModalProps,
  EventFormData,
  FormErrors,
  EVENT_COLORS,
  CATEGORIES,
  EventColor,
} from './CalendarView.types';
import { formatDateForInput } from '@/utils/date.utils';
import { validateEventForm, createDefaultEvent } from '@/utils/event.utils';
import { Trash2 } from 'lucide-react';

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  selectedDate,
  onSave,
  onDelete,
}) => {
  const isEditing = !!event;
  
  const getInitialFormData = useCallback((): EventFormData => {
    if (event) {
      return {
        title: event.title,
        description: event.description || '',
        startDate: event.startDate,
        endDate: event.endDate,
        color: event.color || 'blue',
        category: event.category || '',
      };
    }
    
    const defaultEvent = createDefaultEvent(selectedDate || new Date());
    return {
      title: defaultEvent.title,
      description: defaultEvent.description || '',
      startDate: defaultEvent.startDate,
      endDate: defaultEvent.endDate,
      color: defaultEvent.color || 'blue',
      category: defaultEvent.category || '',
    };
  }, [event, selectedDate]);

  const [formData, setFormData] = useState<EventFormData>(getInitialFormData());
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData());
      setErrors({});
    }
  }, [isOpen, getInitialFormData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EventFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
    if (errors[name as keyof EventFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleColorChange = (color: EventColor) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateEventForm({
      title: formData.title,
      startDate: formData.startDate,
      endDate: formData.endDate,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors as FormErrors);
      return;
    }

    const eventData = {
      ...(event?.id && { id: event.id }),
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      startDate: formData.startDate,
      endDate: formData.endDate,
      color: formData.color,
      category: formData.category || undefined,
    };

    onSave(eventData);
    onClose();
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Event' : 'Create Event'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            maxLength={100}
            placeholder="Event title"
            className={cn(
              'w-full h-10 px-3 rounded-md border border-input bg-background',
              'text-sm text-foreground placeholder:text-muted-foreground',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              errors.title && 'border-destructive focus:ring-destructive'
            )}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-destructive">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={500}
            rows={3}
            placeholder="Event description (optional)"
            className={cn(
              'w-full px-3 py-2 rounded-md border border-input bg-background',
              'text-sm text-foreground placeholder:text-muted-foreground resize-none',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
            )}
          />
        </div>

        {/* Date/Time Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-foreground mb-1.5">
              Start <span className="text-destructive">*</span>
            </label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formatDateForInput(formData.startDate)}
              onChange={handleDateChange}
              className={cn(
                'w-full h-10 px-3 rounded-md border border-input bg-background',
                'text-sm text-foreground',
                'transition-colors duration-150',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                errors.startDate && 'border-destructive focus:ring-destructive'
              )}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-destructive">{errors.startDate}</p>
            )}
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-foreground mb-1.5">
              End <span className="text-destructive">*</span>
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formatDateForInput(formData.endDate)}
              onChange={handleDateChange}
              className={cn(
                'w-full h-10 px-3 rounded-md border border-input bg-background',
                'text-sm text-foreground',
                'transition-colors duration-150',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                errors.endDate && 'border-destructive focus:ring-destructive'
              )}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-destructive">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {EVENT_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => handleColorChange(color.value)}
                className={cn(
                  'w-8 h-8 rounded-full transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  color.class,
                  formData.color === color.value && 'ring-2 ring-offset-2 ring-foreground'
                )}
                aria-label={`Select ${color.label} color`}
              />
            ))}
          </div>
        </div>

        {/* Category */}
        <Select
          label="Category"
          value={formData.category}
          onChange={handleCategoryChange}
          placeholder="Select category"
          options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
        />

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {isEditing && onDelete ? (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          ) : (
            <div />
          )}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? 'Save Changes' : 'Create Event'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
