export default{
    name : "Login",
    created(){
    },
    data(){
    },
    methods:{
        login(){
            location.href = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?scope=offline_access+openid+profile+User.Read&response_type=code&client_id=a3ee0bc3-22fd-4edf-96ba-f0230da27af9&redirect_uri=https://localhost:8080&response_mode=query&sso_reload=true";
        }
    }
}