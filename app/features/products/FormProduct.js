"use client";

import Form from "@/app/components/Form";
import FormRow from "@/app/components/FormRow";
import Input from "@/app/components/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styled from "styled-components";
import useAddProduct from "./useAddProduct";
import useEditProduct from "./useEditProduct";

export function generateSKU({ brand = "", name = "" }) {
  const shortBrand = brand.slice(0, 3).toUpperCase() || "BRD";
  const shortName = name.slice(0, 3).toUpperCase() || "PRD";
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${shortBrand}-${shortName}-${randomNum}`;
}

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
  margin-top: 2rem;
  padding: 1.3rem;
  background: var(--color-brand-600);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
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

export default function FormProduct({ categories, product : updateProduct  }) {
  const {
    id,
    sku,
    name,
    brand,
    description,
    price,
    is_active,
    stock,
    category_id,
 } = updateProduct  || {} ;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues : updateProduct
      ? {
          sku: sku,
          name: name,
          brand: brand,
          description: description,
          price: price,
          stock: stock,
          category_id: category_id,
          is_active: is_active,
        }
      : {
          sku: "",
          name: "",
          brand: "",
          description: "",
          price: "",
          stock: 0,
          category_id: "",
          is_active: true,
        },
  });

  const { addProduct, isLoading } = useAddProduct();
  const { editProduct , isUpdating}=useEditProduct()
  const watchedName = watch("name");
  const watchedBrand = watch("brand");

useEffect(() => {
  if (!updateProduct && (watchedName || watchedBrand)) {
    setValue(
      "sku",
      generateSKU({
        brand: watchedBrand,
        name: watchedName,
      }),
      {
        shouldValidate: true,
      }
    );
  }
}, [watchedName, watchedBrand, setValue, updateProduct]);
function onSubmit(data) {
  const productData = {
    ...data,

    price: Number(data.price),
    stock: Number(data.stock),

    is_active: data.is_active === "true",

    main_image:
      data.main_image?.[0] ??
      updateProduct?.main_image,

    extra_images: data.extra_images
      ? Array.from(data.extra_images)
      : [],
  };

  if (updateProduct) {
    editProduct({
      id: updateProduct.id,
      product: productData,
    });
  } else {
    addProduct(productData);
  }
}

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Product Name" error={errors?.name?.message}>
        <Input
          type="text"
          placeholder="e.g. iPhone 15 Pro"
          id="name"
          {...register("name", { required: "Product name is required" })}
        />
      </FormRow>

      <FormRow label="Brand" error={errors?.brand?.message}>
        <Input
          type="text"
          placeholder="e.g. Apple"
          id="brand"
          {...register("brand", { required: "Brand is required" })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Input
          type="text"
          placeholder="Short description..."
          id="description"
          {...register("description", { required: "Description is required" })}
        />
      </FormRow>

      <FormRow label="Price ($)" error={errors?.price?.message}>
        <Input
          type="number"
          step="0.01"
          placeholder="0.00"
          id="price"
          min={0}
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be ≥ 0" },
          })}
        />
      </FormRow>

      <FormRow label="Stock" error={errors?.stock?.message}>
        <Input
          type="number"
          placeholder="0"
          id="stock"
          min={0}
          {...register("stock", {
            required: "Stock is required",
            min: { value: 0, message: "Stock cannot be negative" },
          })}
        />
      </FormRow>

      <FormRow label="Category">
        <StyledSelect id="category_id" {...register("category_id")}>
          <option value="">— Select category —</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Status">
        <StyledSelect id="is_active" {...register("is_active")}>
          <option value="true">Active</option>
          <option value="false">Hidden</option>
        </StyledSelect>
      </FormRow>

      <FormRow label="Main Image" error={errors?.main_image?.message}>
        <Input
          type="file"
          id="main_image"
          accept="image/*"
          {...register("main_image", {
            required: !updateProduct
              ? "Product image is required"
              : false,
          })}        />
      </FormRow>
      <FormRow label="SKU" error={errors?.sku?.message}>
        <Input
          type="text"
          placeholder="Generated automatically"
          id="sku"
          readOnly
          {...register("sku", { required: "SKU is required" })}
        />
      </FormRow>
      {      
       !updateProduct &&
       <FormRow label="Extra Images">
        <Input
          type="file"
          multiple
          accept="image/*"
          id="extra_images"
          {...register("extra_images")}
        />
      </FormRow>
      }

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? "Saving…" : "Save Product"}
      </SubmitButton>
    </Form>
  );
}
