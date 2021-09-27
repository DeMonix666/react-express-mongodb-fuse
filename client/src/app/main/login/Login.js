import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import * as yup from 'yup';
import _ from '@lodash';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

const schema = yup.object().shape({
	username: yup.string().required('You must enter a username'),
	password: yup
		.string()
		.required('Please enter your password.')
		.min(4, 'Password is too short - should be 4 chars minimum.')
});

const defaultValues = {
	username: '',
	password: ''
};

function Login() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);
	const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		setValue('username', 'dlasthitter6', { shouldDirty: true, shouldValidate: true });
		setValue('password', 'whatthefuck', { shouldDirty: true, shouldValidate: true });
	}, [reset, setValue, trigger]);

	useEffect(() => {
		login.errors.forEach(error => {
			setError(error.type, {
				type: 'manual',
				message: error.message
			});
		});
	}, [login.errors, setError]);

	function onSubmit(model) {
		dispatch(submitLogin(model));
	}

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
			>
				<Card
					className={clsx(
						classes.leftSection,
						'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
					)}
					square
				>
					<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
						<div className="w-full">
							<form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
								<Controller
									name="username"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mb-16"
											type="text"
											error={!!errors.username}
											helperText={errors?.username?.message}
											label="Username"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															user
														</Icon>
													</InputAdornment>
												)
											}}
											variant="outlined"
										/>
									)}
								/>

								<Controller
									name="password"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mb-16"
											label="Password"
											type="password"
											error={!!errors.password}
											helperText={errors?.password?.message}
											variant="outlined"
											InputProps={{
												className: 'pr-2',
												type: showPassword ? 'text' : 'password',
												endAdornment: (
													<InputAdornment position="end">
														<IconButton onClick={() => setShowPassword(!showPassword)}>
															<Icon className="text-20" color="action">
																{showPassword ? 'visibility' : 'visibility_off'}
															</Icon>
														</IconButton>
													</InputAdornment>
												)
											}}
											required
										/>
									)}
								/>

								<Button
									type="submit"
									variant="contained"
									color="primary"
									className="w-full mx-auto mt-16"
									aria-label="LOG IN"
									disabled={_.isEmpty(dirtyFields) || !isValid}
									value="legacy"
								>
									Login
								</Button>
							</form>
						</div>
					</CardContent>

					<div className="flex flex-col items-center justify-center pb-32">
						<div>
							<span className="font-normal mr-8">Don't have an account?</span>
							<Link className="font-normal" to="/register">
								Register
							</Link>
						</div>
						<Link className="font-normal mt-8" to="/">
							Back to Dashboard
						</Link>
					</div>
				</Card>

				<div className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}>
					<div className="max-w-320">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
						>
							<Typography variant="h3" color="inherit" className="font-semibold leading-tight">
								Welcome!
							</Typography>
						</motion.div>

						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
							<Typography variant="subtitle1" color="inherit" className="mt-32">
								The quick brown fox jumps over the lazy dog.
							</Typography>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default Login;
