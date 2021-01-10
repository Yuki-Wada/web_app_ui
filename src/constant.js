const host = (process.env.NODE_ENV === 'production') ?
    'dashboard.heroku.com/apps/radiant-retreat-99635' :
    'http://localhost:8889';

    export default {
    data: function () {
        return {
            host,
        }
    }
}
