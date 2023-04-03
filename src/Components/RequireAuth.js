import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {connect} from "react-redux";

const RequireAuth = ({ user, children })=> {
    const navigate = useNavigate()

    useEffect(()=> {
        if (!user) {
            navigate('/', {replace: true})
            return;
        }
    },[])
    return children;
}

const mapStateToProps = (state)=> {
    return {
        user: state.userState.user,
    }
}

export default connect(mapStateToProps)(RequireAuth);