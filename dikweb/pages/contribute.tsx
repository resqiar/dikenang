export default function RedirectToGithub() {
	return null
}

export async function getServerSideProps() {
	return {
		redirect: {
			destination: 'https://github.com/resqiar/dikenang',
			permanent: false,
		},
	}
}
