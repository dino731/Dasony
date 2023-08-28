import './Finding.css';

const Finding = ()=>{

    return(
        <div className="finding-container">
            <table>
                <thead>
                    <tr>
                        <th>아이디 찾기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>이메일</td>
                        <td><input type='text'/></td>
                    </tr>
                </tbody>
                <tfoot>
                <tr><td colspan={2}><button>아이디 찾기</button></td></tr>
                </tfoot>
            </table>
            
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>비밀번호 찾기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td><input type='text'/></td>
                    </tr>
                </tbody>
                <tfoot>
                <tr><td colspan={2}><button>비밀번호 찾기</button></td></tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Finding;