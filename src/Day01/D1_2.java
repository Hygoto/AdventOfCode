package Day01;
import java.util.Scanner;
import java.io.File;
public class D1_2 {
    public static void main(String[] args) throws Exception {
        int tmp, tmp2, tmp3, tmp4, tmp5;
        int a = 0;
        File input = new File("./src/Day01/input");
        Scanner i = new Scanner(input);
        tmp = i.nextInt();
        tmp2 = i.nextInt();
        tmp3 = i.nextInt();
        tmp4 = (tmp+tmp2+tmp3);
        while (i.hasNextInt()){
            tmp = tmp2;
            tmp2 = tmp3;
            tmp3 = i.nextInt();
            tmp5 = (tmp+tmp2+tmp3);
            if (tmp5 > tmp4) a ++;
            tmp4 =tmp5;
        }
        System.out.println(a);
        i.close();
    }
}
