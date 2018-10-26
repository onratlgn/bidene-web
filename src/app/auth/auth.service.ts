import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'
import { User } from "./user.interface";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:Observable<User|null>;
  // authState:FirebaseAuthState
  isLoggedIn:boolean= false;
  isStudio:boolean = false;

  

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) { }

  loginWithGoogle(){
    var provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider)
    .then( res => {
      this.user["userCred"] = res;
      console.log(res.user.email);
      return of(true).pipe(
        tap(() =>{
          this.isLoggedIn = true;
        })
      )
    })
    .catch(err => {
      console.log(err);
      return of(true).pipe(
        tap(() =>{
          this.isLoggedIn = false;
        })
      ) 
    })
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
      this.isLoggedIn = false;
      console.log(this.user["userCred"].user.email + 'is logged out');
    })
  }

}
