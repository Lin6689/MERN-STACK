#include<stdio.h>

int n, i;

void reverce() {


     for(i=1; i<=n; i++) {
    printf(" enter no : ");
    scanf("%d", &i);
    }

    for(i=n; i>0; i--) {
        printf("%d\n", i);

    }
    
}

void main() {

    
      printf("enter the num: ");
    scanf("%d", &n);

    reverce();

}