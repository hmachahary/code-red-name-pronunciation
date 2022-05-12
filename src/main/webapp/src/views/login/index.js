import React from 'react';
import "./styles.css";

import {Button} from '../../components/index.js'

export default function Login() {
	return (
		<div className="wf_home">
			<div className="wf_home-content">
            <div class="colm-form center">
                <div class="form-container">
                    <input type="text" placeholder="Email address"/>
                    <input type="password" placeholder="Password"/>
                    <Button type="primary"  onClick=""> Login</Button>                                      
                </div>                
            </div>
        </div>
</div>
		
	);
}