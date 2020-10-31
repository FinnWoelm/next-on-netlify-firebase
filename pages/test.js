const TestPage = () => <p>Hi</p>

export async function getServerSideProps() {
  // Do things inside Netlify-Function

  return {
    props: {

    }
  }
}

export default TestPage
