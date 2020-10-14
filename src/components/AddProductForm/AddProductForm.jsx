import React, { Component } from 'react'


class AddProductForm extends Component {
    state = {
        invalidForm: true,
        formData: {
            name: '',
            description: '',
            size: '',
            category: '',
            price: 0,
            inventory: 0,
            photo: ''
        }
    }

    formRef = React.createRef();

    handleChange = (e) => {
        const formData = { ...this.state.formData, [e.target.name]: e.target.value }
        this.setState({
            formData: formData,
            invalidForm: !this.formRef.current.checkValidity()
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleAddProduct(this.state.formData);

    }

    render() {
        return (
            <>
                <h1>Add Product</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off" ref={this.formRef}>
                    <div>
                        <label>Product Name</label>
                        <input
                            name="name"
                            value={this.state.formData.name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={this.state.formData.description}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Size</label>
                        <select
                            name="size"
                            value={this.state.formData.size}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="Extra Large">Extra Large</option>
                        </select>
                    </div>
                    <div>
                        <label>Category</label>
                        <select
                            name="category"
                            value={this.state.formData.category}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="Men's Tri Shorts">Men's Tri Shorts</option>
                            <option value="Women's Tri Shorts">Women's Tri Shorts</option>
                            <option value="Men's Tri Tops">Men's Tri Tops</option>
                            <option value="Women's Tri Tops">Women's Tri Tops</option>
                        </select>
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            min="0"
                            name="price"
                            value={this.state.formData.price}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Inventory</label>
                        <input
                            type="number"
                            min="0"
                            name="inventory"
                            value={this.state.formData.inventory}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Photo Link</label>
                        <input
                            name="photo"
                            value={this.state.formData.photo}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" disabled={this.state.invalidForm}>Submit</button>
                    </div>
                </form>
            </>
        )
    }
}

export default AddProductForm;