import React from 'react';
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {connect} from "react-redux";


class  Layout extends  React.Component{
    state = {
        menu: false
    }
    onToggleHandler=()=>{
        this.setState({
            menu:!this.state.menu
        })
    }
    onclickHandler =()=> {
        this.setState({
            menu: false
        })
    }
    render() {
        return (
            <div className={classes.Layout}>
                <MenuToggle
                    onToggle={this.onToggleHandler}
                    isOpen = {this.state.menu}
                />
                <Drawer
                    isOpen = {this.state.menu}
                    onclickHandler = {this.onclickHandler}
                    isAuthentificated = {this.props.isAuthentificated}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        isAuthentificated: !!state.auth.token
    }
}
export default connect(mapStateToProps)(Layout);