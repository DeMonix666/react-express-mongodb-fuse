import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function ItemForm(props) {
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;

    return (
        <div>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        required
                        helperText={errors?.name?.message}
                        label="Name"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="price"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        required
                        helperText={errors?.name?.message}
                        label="Price"                        
                        id="price"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        required
                        helperText={errors?.name?.message}
                        label="Quantity"
                        id="quantity"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />                    
        </div>
    );
}

export default ItemForm;