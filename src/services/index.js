const ENV = process.env.NODE_ENV

const production = {
    SERVER_HOST: ''
}
const development = {
    SERVER_HOST: ''
}

export default ENV === 'production' ? production : development