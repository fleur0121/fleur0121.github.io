/*
Name: Fuka Nagata
Date: January 30th
Description: This program asks the user to enter their name then prints out their assigned user name.
*/
import java.util.Scanner;
import java.util.Random;

public class userName {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        //Display Enter your name
        System.out.println("Enter your name");  
        String name = scan.nextLine();

        //Converts name to lower case
        String lower = name.toLowerCase();

        //Find where last name starts
        int space = lower.indexOf(" ");
    
        //Find first name's first letter
        String first = name.substring(0,1);

        //Generate 2 digits numbers
        Random gen = new Random();
        int x = gen.nextInt(90) + 10;

        //Generate user name
        System.out.println(first.toLowerCase() + lower.substring(space + 1) + x);
    }
}
