"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/use-categories";

export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [name, setName] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Categories</h1>
        <p className="mt-2 text-muted-foreground">Manage expense and receipt categories stored locally in your browser.</p>
      </div>

      <Card className="flex gap-3 p-5">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" />
        <Button onClick={() => { addCategory(name); setName(""); }}>Add category</Button>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="p-5">
            <Input value={category.name} onChange={(e) => updateCategory(category.id, e.target.value)} />
            <div className="mt-3 flex gap-2">
              <Button variant="outline" onClick={() => updateCategory(category.id, category.name)}>Save</Button>
              <Button variant="outline" onClick={() => deleteCategory(category.id)} disabled={category.isDefault}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
