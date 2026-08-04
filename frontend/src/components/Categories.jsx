import { useContext } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { products, showCategory, setShowCategory, setSelectedSubCategory, selectedSubCategory } = useContext(userContext);

  // Group subcategories by category
  const categoryMap = {};

  products.forEach((product) => {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = new Set();
    }

    categoryMap[product.category].add(product.subCategory);
  });
  const navigate = useNavigate();

  return (
    <>
      {showCategory && (
        <div className="fixed top-16 bg-white shadow-lg z-50 p-6 w-[70%] left-1/2 -translate-x-1/2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(categoryMap).map(([category, subCategories]) => (
              <div key={category}>
                <h3 className="font-bold text-lg mb-2">{category}</h3>

                {[...subCategories].map((subCategory) => (
                  <p
                    key={subCategory}
                    className="ml-3 py-1 cursor-pointer hover:text-blue-700"
                    onClick={() => {setShowCategory(false)
                      setSelectedSubCategory(subCategory)
                      navigate("/products");
                    }}
                  >
                    {subCategory}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;