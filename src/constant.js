const host = (process.env.NODE_ENV === 'production') ?
    'intense-chamber-41417.herokuapp.com' :
    'localhost:8888';

    export default {
    data: function () {
        return {
            host,
        }
    }
}
