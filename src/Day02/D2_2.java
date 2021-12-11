package Day02;
import java.util.Scanner;
import java.io.File;
public class D2_2 {
    public static void main(String[] args) throws Exception {
        int tmp;
        int x = 0;
        int y = 0;
        int aim = 0;
        File input = new File("./src/Day2/input");
        Scanner i = new Scanner(input);
        while (i.hasNextLine()){
            switch (i.next()){
                case "forward":
                tmp = i.nextInt();
                x += tmp;
                y += tmp*aim;
                break;
                case "up":
                aim -= i.nextInt();
                break;
                case "down":
                aim += i.nextInt();
            }
        }
        System.out.println("x: " + x);
        System.out.println("y: " + y);
        System.out.println(x*y);
        i.close();
    }
}