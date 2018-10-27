import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators'
import { User } from "./user.interface";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:Observable<User|null>;
  // authState:FirebaseAuthState
  isLoggedIn:boolean= false;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) { }

  loginWithGoogle():Observable<boolean>{
    var provider = new auth.GoogleAuthProvider();
    return from(this.afAuth.auth.signInWithPopup(provider)).pipe(
      switchMap((res => {
          if(res.user){
            this.user=this.retrieveUser(res.user.uid);
            console.log(res.user.email + ' is authenticated');
            return of(true).pipe(
              tap(()=> this.isLoggedIn = true)
            );
          }else{
            console.log('User cannot be authenticated');
            return of(false);
          }
        })
      )
    )
    }

  logout():void{
    this.afAuth.auth.signOut().then(()=>{
      this.isLoggedIn = false;
    })
  }

  retrieveUser(uid:string):Observable<User|null>{
    return from(this.afStore.collection("users").doc(uid).get()).pipe(
     switchMap(doc => {
        if(!doc.exists){
          console.log('doc do not exist')
          return of(null);
        }else{
          console.log(doc.data());
          return of(doc.data());
        }
     }) 
    )
  }

}

