package Day07;
import java.io.File;
import java.util.Scanner;

public class D7_2 {
    public static void main(String[] args) throws Exception {
        int[] crab = new int[1000];
        int b = 0;
        int ftmp = 0;
        int f = 2147483647;
        int d;
        File input = new File("./src/Day7/input");
        Scanner i = new Scanner(input).useDelimiter(",");
        for (int s = 0; s < 1000; s++) {
            crab[s] = i.nextInt();
            if (crab[s] > b) b = crab[s];
        }
        i.close();
        for (int s = 0; s <= b; s++) {
            for (int w = 0; w < 1000; w++) {
                d = 0;
                for (int q = 1; q <= Math.abs(s-crab[w]); q++) {
                    d += q;
                }
                ftmp += d;
            }
            if (ftmp < f) f = ftmp;
            ftmp = 0;
        }
        System.out.println(f);
    }
}
