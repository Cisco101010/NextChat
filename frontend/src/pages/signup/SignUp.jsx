import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { Button, Input, Typography, Box, IconButton } from '@mui/material';
import { CloudUpload, CheckCircle } from '@mui/icons-material';

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
		image: null, 
	});
	const [fileUploaded, setFileUploaded] = useState(false);

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setInputs({ ...inputs, image: file });
		setFileUploaded(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputs.fullName || !inputs.username || !inputs.password || !inputs.confirmPassword || !inputs.gender) {
			alert("All fields are required!");
			return;
		}
		if (inputs.password !== inputs.confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					<span className='text-black'>Sign Up</span> 
					<span className='text-blue-500'> NicBlockVault</span>
				</h1>
	
				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>
	
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<div>
						<Typography variant="h6" className='label p-2'>
							Profile Picture
						</Typography>
						<Input
							type='file'
							inputProps={{ accept: 'image/*' }}
							onChange={handleFileChange}
							style={{ display: 'none' }} // Hide default input
							id="file-upload"
						/>
						<label htmlFor="file-upload" className='flex items-center justify-center p-4 border border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100'>
							<CloudUpload className='mr-2' />
							<span>Upload Profile Picture</span>
							{fileUploaded && (
								<IconButton color="primary" aria-label="file uploaded" component="span" style={{ marginLeft: '8px' }}>
									<CheckCircle />
								</IconButton>
							)}
						</label>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
