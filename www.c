#include<stdio.h>

int n, i, max;

void large() {

   if(n<=0) {
    printf("invalid input");
    
   }
  
   for(i=1; i<n; i++) {
    printf("enter number %d : ", i);
    scanf("%d", &n);

    if(n>max){
    max = n;
    
    
   }

   }

   
   printf("num is %d", max);
}

void main() {
    printf("how many numbers : ");
    scanf("%d", &n);


    large();

    

}