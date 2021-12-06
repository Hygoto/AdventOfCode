package Day6;

import java.io.File;
import java.util.Scanner;

public class D6 {
    public static void main(String[] args) throws Exception {
        int[] timer = new int[9];
        int days = 80;
        int tmp, n;
        File input = new File("./src/Day6/input");
        Scanner i = new Scanner(input).useDelimiter(",");

        while (i.hasNextInt()) {
            tmp = i.nextInt();
            timer[tmp] ++;
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
