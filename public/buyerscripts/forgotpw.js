function forgotpw(){
    const email = document.getElementById('email').value
    auth.sendPasswordResetEmail(email).then(function() {
        alert('Instruction to reset password has been sent to your mail')
      }).catch(function(error) {
        alert('error occurred, try again later')
      });

}

// fw()