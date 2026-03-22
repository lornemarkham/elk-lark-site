import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import { AddRecipePage } from "./pages/AddRecipePage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<RecipeListPage />} />
          <Route path="/add" element={<AddRecipePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
