package Day06;

import java.io.File;
import java.util.Scanner;

public class D6_2 {
    public static void main(String[] args) throws Exception {
        long[] timer = new long[9];
        int days = 256;
        long tmp, n;
        int t;
        File input = new File("./src/Day6/input");
        Scanner i = new Scanner(input).useDelimiter(",");

        while (i.hasNextInt()) {
            t = i.nextInt();
            timer[t] ++;
        }
        i.close();
        for (int s = days; s > 0; s--) {
            tmp = timer[0];
            for (int w = 1; w < 9; w++) {
                timer[w-1] = timer[w];
            }
            timer[8] = tmp;
            timer[6] += tmp;
        }
        n = 0;
        for (int s = 0; s < 9; s++) {
            n += timer[s];
        }
        System.out.println(n);
    }
}