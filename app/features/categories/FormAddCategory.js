"use client";

import styled from "styled-components";
import { useForm } from "react-hook-form";
import Form from "@/app/components/Form";
import FormRow from "@/app/components/FormRow";
import useAddCategory from "./useAddCategory";
import useUpdateCategory from "./useUpdateCategory";
import { useEffect } from "react";

// ─── Styled ───────────────────────────────────────────────────────────────────

const StyledInput = styled.input`
  width: 100%;
  padding: 1.1rem 1.4rem;
  border: 1.5px solid var(--color-grey-300);
  border-radius: 10px;
  background: var(--color-grey-0);
  font-size: 1.4rem;
  color: var(--color-grey-700);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  outline: none;

  &:focus {
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }

  &[type="file"] {
    padding: 0.9rem;
    background: var(--color-grey-50);
    cursor: pointer;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 1.1rem 1.4rem;
  border: 1.5px solid var(--color-grey-300);
  border-radius: 10px;
  background: var(--color-grey-0);
  font-size: 1.4rem;
  color: var(--color-grey-700);
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-brand-500);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 1.6rem;
  padding: 1.3rem;
  background: var(--color-brand-600);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;

  &:hover:not(:disabled) {
    background: var(--color-brand-700);
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function FormAddCategory({ category , onSuccess }) {
  const{name , slug , description} = category || {}
  const isEditing = Boolean(category?.id);
  const {register, handleSubmit, reset, setValue, watch, formState: { errors }} = useForm({
    defaultValues: isEditing
      ? { name, slug, description , is_active: String(category.is_active)}
      : { is_active: "true" },
  });

  const nameValue = watch("name");
  useEffect(() => {
    if (nameValue) {
      const slug = generateSlug(nameValue);
      setValue("slug", slug);
    }
  }, [nameValue, setValue]);

  const { addCategory, isLoading: isAdding } = useAddCategory();
  const { updateCategory, isLoading: isUpdating } = useUpdateCategory();

  const isLoading = isAdding || isUpdating;

  function onSubmit(data) {
    const payload = {
      ...data,
      is_active: data.is_active === "true",
    };

    if (isEditing) {
      updateCategory(
        {
          id: category.id,
          updates: { ...payload, image: data.image?.[0] ?? category.image },
        },
        {
          onSuccess: () => {
            reset();
            onSuccess?.();
          },
        },
      );
    } else {
      addCategory(
        { ...payload, image: data.image?.[0] },
        {
          onSuccess: () => {
            reset();
            onSuccess?.();
          },
        },
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={errors.name?.message}>
        <StyledInput
          id="name"
          type="text"
          placeholder="Category name"
          {...register("name", { required: "Name is required" })}
        />
      </FormRow>

      <FormRow label="Slug" error={errors.slug?.message}>
        <StyledInput
          id="slug"
          type="text"
          placeholder="category-slug"
          {...register("slug", { required: "Slug is required" })}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <StyledInput
          id="description"
          type="text"
          placeholder="Short description"
          {...register("description", { required: "Description is required" })}
        />
      </FormRow>

      <FormRow label="Status">
        <StyledSelect id="is_active" {...register("is_active")}>
          <option value="true">Active</option>
          <option value="false">Hidden</option>
        </StyledSelect>
      </FormRow>

      <FormRow label="Image" error={errors.image?.message}>
        <StyledInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: isEditing ? false : "Image is required",
          })}
        />
        {isEditing && (
          <small style={{ fontSize: "1.2rem", color: "var(--color-grey-500)" }}>
            Leave empty to keep the current image
          </small>
        )}
      </FormRow>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading
          ? isEditing
            ? "Saving…"
            : "Adding…"
          : isEditing
            ? "Save changes"
            : "Add category"}
      </SubmitButton>
    </Form>
  );
}
