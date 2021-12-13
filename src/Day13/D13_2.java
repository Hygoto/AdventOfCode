package Day13;

import java.io.File;
import java.io.PrintWriter;
import java.util.Scanner;

public class D13_2 {
    public static void main(String[] args) throws Exception {
        int size = 1400;
        File input = new File("./src/Day13/input");
        Scanner i = new Scanner(input).useDelimiter(",|\\n|=");
        boolean[][] sheet = new boolean[size][size];
        int tmp;
        while (i.hasNextInt()) {
            tmp = i.nextInt();
            sheet[tmp][i.nextInt()] = true;
        }
        i.nextLine();
        while (i.hasNextLine()) {
            if (i.next().charAt(11) == 'x') {
                tmp = i.nextInt();
                for (int s = tmp; s < size; s++) {
                    for (int w = 0; w < size; w++) {
                        if (sheet[s][w]) {
                            sheet[s-((s-tmp)*2)][w] = true;
                            sheet[s][w] = false;
                        }
                    }
                }
            }
            else {
                tmp = i.nextInt();
                for (int s = 0; s < size; s++) {
                    for (int w = tmp; w < size; w++) {
                        if (sheet[s][w]){
                            sheet[s][w-((w-tmp)*2)] = true;
                            sheet[s][w] = false;
                        }
                    }
                }
            }
        }
        i.close();
        PrintWriter writer = new PrintWriter("./src/Day13/code", "UTF-8");      // You might have to twist your head an mirror the output.
        for (int s = 0; s < size; s++) {
            for (int w = 0; w < size; w++) {
                if (sheet[s][w]) writer.print("#");
                else writer.print(".");
                if (w == size-1) writer.print("\n");
            }
        }
    }
}