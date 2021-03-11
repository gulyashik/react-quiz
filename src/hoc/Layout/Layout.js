import React from 'react';
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class  Layout extends  React.Component{
    state = {
        menu: false
    }
    onToggleHandler=()=>{
        this.setState({
            menu:!this.state.menu
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
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
export default Layout;