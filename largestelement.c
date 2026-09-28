#include<stdio.h>

int n1,n2, n3;

void large() {
    
    if(n1>n2) {
        printf(" %d is largest", n1);
    } 
    else if(n1>n3) {
        printf("%d is largest", n1);
    }
    else if(n2>n3) {
        printf("%d is largest", n2);
    }
    else if(n2>n1) {
        printf("%d is largest", n2);
    }
    else if(n3>n2) {
        printf("%d is largest", n3);
    }
    else if(n3>n1) {
        printf("%d is largest", n3);
    }
    
}

void main() {
    printf("enter the num: ");
    scanf("%d", &n1);

    printf("enter the num: ");
    scanf("%d", &n2);

    printf("enter the num: ");
    scanf("%d", &n3);


    large();

}