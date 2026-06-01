"use client";

import { useManagerStore } from "@/store/manager-store";

export function useCategories() {
  const categories = useManagerStore((state) => state.categories);
  const addCategory = useManagerStore((state) => state.addCategory);
  const updateCategory = useManagerStore((state) => state.updateCategory);
  const deleteCategory = useManagerStore((state) => state.deleteCategory);

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
