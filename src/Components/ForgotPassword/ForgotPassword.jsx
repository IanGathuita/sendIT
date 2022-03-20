import css from './ForgotPassword.css';
export default  function ForgotPassword(){
    return(
        <section>
            <form>
                <h3>Forgot your password?</h3>
                <p className="form-paragraph">Don't worry. Enter your email below and we will email you a link to reset it.</p>
                <label></label>
                <input></input>
                <button>Send</button>
            </form>
        </section>
    );
}