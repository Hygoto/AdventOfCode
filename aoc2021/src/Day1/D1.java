package Day1;
import java.util.Scanner;
import java.io.File;
public class D1 {
    public static void main(String[] args) throws Exception {
        int tmp, tmp2;
        int a = 0;
        File input = new File("./src/Day1/input");
        Scanner i = new Scanner(input);
        tmp = i.nextInt();
        while (i.hasNextInt()){
            tmp2 = i.nextInt();
            if (tmp2 > tmp) a ++;
            tmp =tmp2;
        }
        System.out.println(a);
        i.close();
    }
}
