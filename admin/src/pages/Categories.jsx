import React, { useState } from "react";
import { categories as predefinedCategories } from "../constants/data";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const Categories = () => {
  const [categories, setCategories] = useState(predefinedCategories);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.find(cat => cat.category === newCategory)) {
      const newCategoryObj = { category: newCategory, subcategories: [] };
      setCategories([...categories, newCategoryObj]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryName) => {
    setCategories(categories.filter(category => category.category !== categoryName));
  };

  const handleAddSubcategory = (categoryName) => {
    if (newSubcategory.trim()) {
      setCategories(categories.map(category => {
        if (category.category === categoryName) {
          return {
            ...category,
            subcategories: [...category.subcategories, newSubcategory],
          };
        }
        return category;
      }));
      setNewSubcategory("");
    }
  };

  const handleRemoveSubcategory = (categoryName, subcategory) => {
    setCategories(categories.map(category => {
      if (category.category === categoryName) {
        return {
          ...category,
          subcategories: category.subcategories.filter(sub => sub !== subcategory),
        };
      }
      return category;
    }));
  };

  const handleEditCategory = (oldName, newName) => {
    if (newName.trim()) {
      setCategories(categories.map(category => {
        if (category.category === oldName) {
          return { ...category, category: newName };
        }
        return category;
      }));
      setEditingCategory(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      
      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue3 hover:bg-blue2 text-white px-4 py-2 rounded hover:bg-blue-600 w-[10%]"
        >
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.category} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center">
              {editingCategory === category.category ? (
                <input
                  type="text"
                  defaultValue={category.category}
                  onBlur={(e) => handleEditCategory(category.category, e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              ) : (
                <h2 className="text-xl font-semibold">{category.category}</h2>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingCategory(category.category)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleRemoveCategory(category.category)}
                  className="text-red-500 hover:text-red-600"
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium">Subcategories:</h3>
              <ul className="list-disc pl-6">
                {category.subcategories.map((sub) => (
                  <li key={sub} className="flex justify-between items-center">
                    {sub}
                    <button
                      onClick={() => handleRemoveSubcategory(category.category, sub)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <AiOutlineDelete size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 items-center mt-2">
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder="Add subcategory"
                  className="p-2 border border-gray-300 rounded w-full"
                />
                <button
                  onClick={() => handleAddSubcategory(category.category)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;