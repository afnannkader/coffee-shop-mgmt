import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/ProductConstants';
import { createProduct, clearErrors } from '../../actions/productAction';
import { categories } from '../../utils/Constant';
import MetaData from '../layouts/MetaData';
import BackdropLoader from '../layouts/BackdropLoader';

const NewProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("Coffee");

    const newProductSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("description", description);
        formData.set("price", price);
        formData.set("category", category);

        dispatch(createProduct(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Product Created", { variant: "success" });
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate("/admin/products");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Product" />

            {loading && <BackdropLoader />}
            <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white rounded-lg shadow p-4">

                <div className="flex flex-col gap-3 m-2">
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            inputProps: {
                                min: 0
                            }
                        }}
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        label="Category"
                        select
                        fullWidth
                        variant="outlined"
                        size="small"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((el, i) => (
                            <MenuItem value={el} key={i}>
                                {el}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                        Submit
                    </button>
                </div>

            </form>
        </>
    );
};

export default NewProduct;
