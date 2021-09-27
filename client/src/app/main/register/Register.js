import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
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
	username: yup.string().required('You must enter username'),
	password: yup
		.string()
		.required('Please enter your password.')
		.min(8, 'Password is too short - should be 8 chars minimum.'),
	passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const defaultValues = {
	username: 'coolkalang',
	password: 'whatthefuck',
	passwordConfirm: 'whatthefuck'
};

function Register() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const authRegister = useSelector(({ auth }) => auth.register);

	const { control, formState, handleSubmit, reset, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		authRegister.errors.forEach(error => {
			setError(error.type, {
				type: 'manual',
				message: error.message
			});
		});
	}, [authRegister.errors, setError]);

	function onSubmit(model) {
		dispatch(submitRegister(model));
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
											label="Username"
											error={!!errors.username}
											helperText={errors?.username?.message}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															person
														</Icon>
													</InputAdornment>
												)
											}}
											variant="outlined"
											required
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
											type="password"
											label="Password"
											error={!!errors.password}
											helperText={errors?.password?.message}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															vpn_key
														</Icon>
													</InputAdornment>
												)
											}}
											variant="outlined"
											required
										/>
									)}
								/>

								<Controller
									name="passwordConfirm"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mb-16"
											type="password"
											label="Confirm Password"
											error={!!errors.passwordConfirm}
											helperText={errors?.passwordConfirm?.message}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															vpn_key
														</Icon>
													</InputAdornment>
												)
											}}
											variant="outlined"
											required
										/>
									)}
								/>

								<Button
									type="submit"
									variant="contained"
									color="primary"
									className="w-full mx-auto mt-16"
									aria-label="REGISTER"
									disabled={_.isEmpty(dirtyFields) || !isValid}
									value="legacy"
								>
									Register
								</Button>
							</form>
						</div>
					</CardContent>

					<div className="flex flex-col items-center justify-center pb-32">
						<div>
							<span className="font-normal mr-8">Already have an account?</span>
							<Link className="font-normal" to="/login">
								Login
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

export default Register;
