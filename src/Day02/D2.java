package Day02;
import java.util.Scanner;
import java.io.File;
public class D2 {
    public static void main(String[] args) throws Exception {
        int x = 0;
        int y = 0;
        File input = new File("./src/Day2/input");
        Scanner i = new Scanner(input);
        while (i.hasNextLine()){
            switch (i.next()){
                case "forward":
                x += i.nextInt();
                break;
                case "up":
                y -= i.nextInt();
                break;
                case "down":
                y += i.nextInt();
            }
        }
        System.out.println("x: " + x);
        System.out.println("y: " + y);
        System.out.println(x*y);
        i.close();
    }
}
