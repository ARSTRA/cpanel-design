import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../../context/AppContext";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 25px 30px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;

  &:hover {
    background: #229954;
  }
`;

const Content = styled.div`
  padding: 30px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ProductCard = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #bbb;
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 18px;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #27ae60;
  margin-bottom: 10px;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
  color: #7f8c8d;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &.edit {
    background: #f39c12;
    color: white;
  }

  &.delete {
    background: #e74c3c;
    color: white;
  }

  &.view {
    background: #3498db;
    color: white;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e8ed;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #2c3e50;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #7f8c8d;

  &:hover {
    color: #2c3e50;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;

  input {
    margin: 0;
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`;

const categories = [
  { value: "handguns", label: "Handguns" },
  { value: "rifles", label: "Rifles" },
  { value: "shotguns", label: "Shotguns" },
  { value: "accessories", label: "Accessories" },
  { value: "ammunition", label: "Ammunition" },
];

const displayLocations = [
  { value: "home", label: "Home Page" },
  { value: "featured", label: "Featured Products" },
  { value: "handguns", label: "Handguns Page" },
  { value: "rifles", label: "Rifles Page" },
  { value: "shotguns", label: "Shotguns Page" },
  { value: "accessories", label: "Accessories Page" },
  { value: "ammunition", label: "Ammunition Page" },
];

export default function ProductManagement() {
  const { state, dispatch } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "handguns",
    stock: "",
    featured: false,
    displayLocation: [],
  });

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "handguns",
      stock: "",
      featured: false,
      displayLocation: [],
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      featured: product.featured,
      displayLocation: product.displayLocation || [],
    });
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch({ type: "DELETE_PRODUCT", payload: productId });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      images: ["/api/placeholder/400/300"], // Placeholder for now
    };

    if (editingProduct) {
      dispatch({
        type: "UPDATE_PRODUCT",
        payload: { ...productData, id: editingProduct.id },
      });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: productData });
    }

    setShowModal(false);
  };

  const handleLocationChange = (location, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        displayLocation: [...formData.displayLocation, location],
      });
    } else {
      setFormData({
        ...formData,
        displayLocation: formData.displayLocation.filter((l) => l !== location),
      });
    }
  };

  return (
    <Container>
      <Header>
        <Title>Product Management</Title>
        <AddButton onClick={handleAdd}>+ Add New Product</AddButton>
      </Header>

      <Content>
        <ProductGrid>
          {state.products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage>🔫</ProductImage>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price}</ProductPrice>
                <ProductMeta>
                  <span>Category: {product.category}</span>
                  <span>Stock: {product.stock}</span>
                </ProductMeta>
                <ProductActions>
                  <ActionButton className="view">View</ActionButton>
                  <ActionButton
                    className="edit"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    className="delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </ActionButton>
                </ProductActions>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </Content>

      {showModal && (
        <Modal
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Product Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </FormGroup>

              <FormGroup>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                  />
                  Featured Product
                </CheckboxLabel>
              </FormGroup>

              <FormGroup>
                <Label>Display Locations</Label>
                <CheckboxGroup>
                  {displayLocations.map((location) => (
                    <CheckboxLabel key={location.value}>
                      <input
                        type="checkbox"
                        checked={formData.displayLocation.includes(
                          location.value,
                        )}
                        onChange={(e) =>
                          handleLocationChange(location.value, e.target.checked)
                        }
                      />
                      {location.label}
                    </CheckboxLabel>
                  ))}
                </CheckboxGroup>
              </FormGroup>

              <SubmitButton type="submit">
                {editingProduct ? "Update Product" : "Add Product"}
              </SubmitButton>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
