/*
Name: Fuka Nagata
Date: January 30th
Description: This program asks the user to answer a five-question quiz, indicates whether the answer is correct or incorrect, and finally displays the number of correct answers and the percentage of correct answers.
*/
import java.util.Scanner;
import java.util.Random;

public class Quiz {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // Display Quiz time!
        System.out.println("Quiz time!\n");

        // Count correct answers
        int correct = 0;
        // Question 1
        System.out.println("1. Which CPSC course can learn the basics of java in Langara?");
        int ans1 = scan.nextInt();
        
        if (ans1 == 1150){
            //Display Correct
            System.out.println("Correct!");
            correct++;
        }
            // Display no.
        else {
            System.out.println("no.");
        }

        // For the enter
        scan.nextLine();

        // Question 2
        System.out.println("\n2. Where is the capital city of Canada?");
        String ans2 = scan.nextLine();

        if (ans2 == "Ottawa"){
            //Display Correct
            System.out.println("Correct!");
            correct++;
        }
            // Display no.
        else {
            System.out.println("no.");
        }

        // Question 3
        System.out.println("\n3. Which of these choices are correct? A, B, or C？\n A. August has 30 days.\n B. January has 31 days.\n C. November has 31 days.");
        String ans3 = scan.nextLine();
        if (ans3 == "B"){
            //Display Correct
            System.out.println("Correct!");
            correct++;
        }
            // Display no.
        else {
            System.out.println("no.");
        }

        // Question 4
        System.out.println("\n4. What is the most popular phone?");
        String ans4 = scan.nextLine();
        if (ans4 == "iPhone"){
            //Display Correct
            System.out.println("Correct!");
            correct++;
        }
            // Display no.
        else {
            System.out.println("no.");
        }

        // Question 5
        System.out.println("\n5. What is 13 + 1492?");
        int ans5 = scan.nextInt();
        if (ans5 == 1505){
            //Display Correct
            System.out.println("Correct!");
            correct++;
        }
            // Display no.
        else {
            System.out.println("no.");
        }

        // Calculate & print the percentage of correct answers
        double percentage = (double) correct / 5 * 100;
        System.out.println("\nCongratulations, you got " + correct + " answers right.");
        System.out.println("That is a score of " + percentage + " percent.");

    }
        }