export default function RedirectToColorIssue() {
	return null
}

export async function getServerSideProps() {
	return {
		redirect: {
			destination: 'https://github.com/resqiar/dikenang/issues/163',
			permanent: false,
		},
	}
}
